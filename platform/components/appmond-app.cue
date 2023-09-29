"appmod-app": {
	alias: ""
	annotations: {}
	attributes: workload: definition: {
		apiVersion: "<change me> apps/v1"
		kind:       "<change me> Deployment"
	}
	description: ""
	labels: {}
	type: "component"
}

template: {
	output: {
		apiVersion: "argoproj.io/v1alpha1"
		kind:       "Rollout"
		metadata: name: "rollout-canary"
		spec: {
			replicas:             5
			revisionHistoryLimit: 2
			selector: matchLabels: app: "rollout-canary"
			strategy: canary: steps: [{
				setWeight: 20
			}, {
				pause: {}
			}, {
				setWeight: 40
			}, {
				pause: duration: "40s"
			}, {
				setWeight: 60
			}, {
				pause: duration: "20s"
			}, {
				setWeight: 80
			}, {
				pause: duration: "20s"
			}]
			template: {
				metadata: labels: app: "rollout-canary"
				spec: containers: [{
					image:           "argoproj/rollouts-demo:blue"
					imagePullPolicy: "Always"
					name:            "rollouts-demo"
					ports: [{
						containerPort: 8080
					}]
				}]
			}
		}
	}
	outputs: {}
	parameter: {}
}
