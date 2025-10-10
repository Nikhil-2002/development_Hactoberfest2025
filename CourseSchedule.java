class Solution {
    public boolean canFinish(int N, int[][] prerequisites) {
        ArrayList<ArrayList<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < N; i++) adj.add(new ArrayList<>());
        for (int[] e : prerequisites) {
            int u = e[0], v = e[1];
            adj.get(v).add(u);   
        }
    
        int[] indegree = new int[N];
        for(int i=0;i<N;i++){
            for(int it:adj.get(i)){
                indegree[it]++;
            }
        }
        Queue<Integer> q = new LinkedList<>();
        for (int i = 0; i < N; i++) {
            if (indegree[i] == 0) q.add(i);
        }

        int count = 0;
        while (!q.isEmpty()) {
            int node = q.poll();
            count++;
            
            for (int nei : adj.get(node)) {
                indegree[nei]--;
                if (indegree[nei] == 0) q.add(nei);
            }
        }

        if(count==N) return true;
        else return false;
    }
}
