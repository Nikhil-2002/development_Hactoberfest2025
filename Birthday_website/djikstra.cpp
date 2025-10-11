#include <iostream>
#include <vector>
#include <queue>
#include <climits>
using namespace std;

// Function to implement Dijkstra's algorithm
void dijkstra(int n, vector<vector<pair<int, int>>> &adj, int src) {
    vector<int> dist(n, INT_MAX); // distance from source to each node
    dist[src] = 0;

    // Min-heap (priority queue) storing pairs (distance, node)
    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;
    pq.push({0, src});

    while (!pq.empty()) {
        int currDist = pq.top().first;
        int u = pq.top().second;
        pq.pop();

        // Skip if we already found a shorter path
        if (currDist > dist[u]) continue;

        for (auto &edge : adj[u]) {
            int v = edge.first;
            int weight = edge.second;

            if (dist[u] + weight < dist[v]) {
                dist[v] = dist[u] + weight;
                pq.push({dist[v], v});
            }
        }
    }

    // Print shortest distances
    cout << "Shortest distances from node " << src << ":\n";
    for (int i = 0; i < n; i++) {
        cout << "Node " << i << " : ";
        if (dist[i] == INT_MAX)
            cout << "INF";
        else
            cout << dist[i];
        cout << endl;
    }
}

int main() {
    int n = 5; // number of nodes
    vector<vector<pair<int, int>>> adj(n);

    // Add edges (u -> v with weight)
    adj[0].push_back({1, 2});
    adj[0].push_back({2, 4});
    adj[1].push_back({2, 1});
    adj[1].push_back({3, 7});
    adj[2].push_back({4, 3});
    adj[3].push_back({4, 1});

    int src = 0;
    dijkstra(n, adj, src);

    return 0;
}
