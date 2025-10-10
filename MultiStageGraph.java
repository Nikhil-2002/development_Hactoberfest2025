
// A Multistage graph is a directed, weighted graph in which the nodes can be divided into a set of stages such that all edges are from a stage to next stage only
// (In other words there is no edge between vertices of same stage and from a vertex of current stage to previous stage).

// The vertices of a multistage graph are divided into n number of disjoint subsets S = { S1 , S2 , S3 ……….. Sn }, where S1 is the source and Sn is the sink(destination).
// The cardinality of S1 and Sn are equal to 1. i.e., |S1| = |Sn| = 1.
// We are given a multistage graph, a source and a destination, we need to find shortest path from source to destination.
// By convention, we consider source at stage 1 and destination as last stage.
class MultiStageGraph {

	static int N = 8;
	static int INF = Integer.MAX_VALUE;

	// Returns shortest distance from 0 to
	// N-1.
	public static int shortestDist(int[][] graph)
	{

		// dist[i] is going to store shortest
		// distance from node i to node N-1.
		int[] dist = new int[N];

		dist[N - 1] = 0;

		// Calculating shortest path for
		// rest of the nodes
		for (int i = N - 2; i >= 0; i--) {

			// Initialize distance from i to
			// destination (N-1)
			dist[i] = INF;

			// Check all nodes of next stages
			// to find shortest distance from
			// i to N-1.
			for (int j = i; j < N; j++) {
				// Reject if no edge exists
				if (graph[i][j] == INF) {
					continue;
				}

				// We apply recursive equation to
				// distance to target through j.
				// and compare with minimum distance
				// so far.
				dist[i] = Math.min(dist[i],
								graph[i][j] + dist[j]);
			}
		}

		return dist[0];
	}

	// Driver code
	public static void main(String[] args)
	{
		// Graph stored in the form of an
		// adjacency Matrix
		int[][] graph = new int[][] {
			{ INF, 1, 2, 5, INF, INF, INF, INF },
			{ INF, INF, INF, INF, 4, 11, INF, INF },
			{ INF, INF, INF, INF, 9, 5, 16, INF },
			{ INF, INF, INF, INF, INF, INF, 2, INF },
			{ INF, INF, INF, INF, INF, INF, INF, 18 },
			{ INF, INF, INF, INF, INF, INF, INF, 13 },
			{ INF, INF, INF, INF, INF, INF, INF, 2 }
		};

		System.out.println(shortestDist(graph));
	}
}
