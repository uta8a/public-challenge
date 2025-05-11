package main

import (
	"fmt"
	"html"
	"net/http"
	"os"
	"regexp"
	"text/template"

	"github.com/google/uuid"
)

var authStore map[string]string
var sessionStore map[string]string
var gistStore map[string]string

func init() {
	admin_password, ok := os.LookupEnv("ADMIN_PASSWORD")
	if !ok || admin_password == "" {
		panic("ADMIN_PASSWORD not set")
	}
	admin_gist_url, ok := os.LookupEnv("ADMIN_GIST_URL")
	if !ok || admin_gist_url == "" || !check(admin_gist_url) {
		panic("something wrong with ADMIN_GIST_URL")
	}
	authStore = make(map[string]string)
	authStore["admin"] = admin_password
	authStore["guest"] = "guest"

	gistStore = make(map[string]string)
	gistStore["admin"] = admin_gist_url
	gistStore["guest"] = "0123456789ab"

	sessionStore = make(map[string]string)
}

func main() {
	http.HandleFunc("/", indexHandler)
	http.HandleFunc("/login", loginHandler)
	http.HandleFunc("/user", userHandler)
	http.HandleFunc("/{id}", gistHandler)
	http.ListenAndServe(":3000", nil)
}

func indexHandler(w http.ResponseWriter, r *http.Request) {
	tmpl, err := template.ParseFiles("view/index.html")
	if err != nil {
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}
	if err := tmpl.Execute(w, nil); err != nil {
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}
}

func loginHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodPost {
		username := r.FormValue("username")
		password := r.FormValue("password")
		if authenticate(username, password) {
			session := uuid.New().String()
			sessionStore[session] = username
			http.SetCookie(w, &http.Cookie{
				Name:  "session",
				Value: session,
				Path:  "/",
			})
			http.Redirect(w, r, "/user", http.StatusSeeOther)
			return
		}
		http.Error(w, "Invalid credentials", http.StatusUnauthorized)
		return
	}
	http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
}

func userHandler(w http.ResponseWriter, r *http.Request) {
	cookie, err := r.Cookie("session")
	if err != nil {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}
	username, ok := sessionStore[cookie.Value]
	if !ok {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}
	tmpl, err := template.ParseFiles("view/user.html")
	if err != nil {
		fmt.Println("Error parsing template:", err)
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}
	data := struct {
		Username   string
		GistUrl    string
		Stylesheet string
	}{
		Username:   username,
		GistUrl:    gistStore[username],
		Stylesheet: "<style>" + html.EscapeString(r.URL.Query().Get("stylesheet")) + "</style>",
	}
	if err := tmpl.Execute(w, data); err != nil {
		fmt.Println("Error executing template:", err)
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
	}
}

func gistHandler(w http.ResponseWriter, r *http.Request) {
	id := r.URL.Path[len("/gist"):]
	if id == gistStore["admin"] {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("Flag: " + os.Getenv("FLAG")))
		return
	}
	if id == gistStore["guest"] {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("Guest page!"))
		return
	}
	http.Error(w, "Not Found", http.StatusNotFound)
}

func authenticate(username, password string) bool {
	if pass, ok := authStore[username]; ok {
		return pass == password
	}
	return false
}

func check(url string) bool {
	if !regexp.MustCompile(`^[a-f0-9]{12}$`).MatchString(url) {
		return false
	}
	return true
}
