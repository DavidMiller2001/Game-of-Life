package main

import (
	"encoding/json"
	"fmt"
	"main/gol"
	"net/http"
)

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("/", handleRoot)
	mux.HandleFunc("POST /", getNextIteration)

	port := ":8080"
	fmt.Println("Server listening at port", port)
	http.ListenAndServe(port, mux)
}

func handleRoot(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Hello from Go!")
}

func getNextIteration(w http.ResponseWriter, r *http.Request) {

	var grid [][]int
	err := json.NewDecoder(r.Body).Decode(&grid)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
	}
	
	newGrid := gol.UpdateGrid(grid)

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(newGrid)
}
