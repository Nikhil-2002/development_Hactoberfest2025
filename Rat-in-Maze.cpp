// Backtracking is an algorithmic-technique for solving recursive problems by trying to built every
// every possible solution incrementally and removing those solutions that fail to satilfy the contraints
// of propblem at any point of time

#include <iostream>
using namespace std;

// x and y are position coordinates
// n is the size of the array/maze
// int** arr for dynamic array
bool isSafe(int **arr, int x, int y, int n)
{
    if (x < n && y < n && arr[x][y] == 1)
    {
        return true;
    }
    return false;
}

bool ratinMaze(int **arr, int x, int y, int n, int **solArr)
{

    if (x == n - 1 && y == n - 1)
    {
        solArr[x][y] = 1;
        return true;
    }

    if (isSafe(arr, x, y, n))
    {
        solArr[x][y] =  1;
        if (ratinMaze(arr, x + 1, y, n, solArr))
        {
            return true;
        }
        if (ratinMaze(arr, x, y + 1, n, solArr))
        {
            return true;
        }
        solArr[x][y] = 0; // Backtracking
        return 0;
    }
    return false;
}

int main()
{
    int n;
    cin >> n;
    // Memory allocation of row of 1D array through dynamic
    int **arr = new int *[n]; // Dynamic Array
    for (int i = 0; i < n; i++)
    {
        arr[i] = new int[n];
    }

    // Input of 2D array
    for (int i = 0; i < n; i++)
    {
        for (int j = 0; j < n; j++)
        {
            cin >> arr[i][j];
        }
    }

    // Dynamic Memory allocation for solution array
    int **solArr = new int *[n]; // Dynamic Array
    for (int i = 0; i < n; i++)
    {
        solArr[i] = new int[n];

        for (int j = 0; j < n; j++)
        {
            solArr[i][j] = 0;
        }
    }

    if (ratinMaze(arr, 0, 0, n, solArr))
    {
        for (int i = 0; i < n; i++)
        {
            for (int j = 0; j < n; j++) 
            {
                cout << solArr[i][j]<<" ";
            }cout <<endl;
        }
    }

    return 0;
}

// 1 0 1 0 1
// 1 1 1 1 1
// 0 1 0 1 0
// 1 0 0 1 1
// 1 1 1 0 1