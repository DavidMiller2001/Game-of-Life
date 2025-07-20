package gol

func InitGrid(rows int, cols int) [][]int {
	newGrid := make([][]int, rows)
	for i := range newGrid {
		newGrid[i] = make([]int, cols)
	}

	return newGrid
}

func calcNeighbors(grid [][]int, i int, j int) int {
	var neighbors int = 0

	// possible list of neighbors for any given cell
	directions := [8][2]int{
		{-1,-1}, {-1, 0}, {-1, 1},
		{0, -1},          {0, 1},
		{1, -1}, {1, 0},  {1, 1},
	}

	// max row and col
	maxRow := len(grid)
	maxCol := len(grid[0])

	for _, dir := range directions {
		neighborI := i + dir[0]
		neighborJ := j + dir[1]

		if neighborI >= 0 && neighborI < maxRow && neighborJ >= 0 && neighborJ < maxCol {
			if grid[neighborI][neighborJ] == 1 {
				neighbors++
			}
		}
	} 

	return neighbors
}

func UpdateGrid(grid [][]int) [][]int {
	// create a clone of the grid to be modified without altering the current one
	newGrid := InitGrid(len(grid), len(grid[0]))

	for i := range grid {
		for j := range grid[i] {

			neighbors := calcNeighbors(grid, i, j)

			// Determine cell status for next iteration:

			// if the current cell is alive
			if grid[i][j] == 1 {
				// the cell dies if it has less than 2 neighbors or more than 3 neighbors
				if neighbors < 2 || neighbors > 3 {
					newGrid[i][j] = 0
				} else {
					// otherwise the cell lives on to the next iteration
					newGrid[i][j] = 1
				}
			} else {
				// a dead cell becomes alive if it has exactly 3 neighbors
				if neighbors == 3 {
					newGrid[i][j] = 1
				} else {
					newGrid[i][j] = 0
				}
			}
		}
	}

	return newGrid
}