package main

import (
	"encoding/csv"
	"io/ioutil"
	"log"
	"os"
)

func main() {
	// open input
	f, err := os.Open(os.Args[1])
	if err != nil {
		log.Fatal(err)
	}

	// read input
	content, err := csv.NewReader(f).ReadAll()
	if err != nil {
		log.Fatal(err)
	}

	// first line
	output := "\\begin{tabular}{"
	for i := 0; i < len(content[0]); i++ {
		output += "|c"
	}
	output += "|}\n"

	// write contents
	for _, i := range content {
		output += "\t\\hline\n"
		for index, j := range i {
			if index == 0 {
				output += "\t"
				output += j
			} else {
				output += " & " + j
			}
		}
		output += " \\\\\n"
	}

	// last line
	output += "\t\\hline\n\\end{tabular}"

	// write to output
	ioutil.WriteFile(os.Args[2], []byte(output), 0644)
}
