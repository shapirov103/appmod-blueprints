"appmod-service": {
	alias: ""
	annotations: {}
	attributes: workload: definition: {
		apiVersion: "apps/v1"
		kind:       "Deployment"
	}
	description: "Appmod deployment with canary support"
	labels: {}
	type: "component"
}

template: {
	output: {
		apiVersion: "argoproj.io/v1alpha1"
		kind:       "Rollout"
		metadata: name: context.appName
		spec: {
			replicas:             parameter.replicas
			revisionHistoryLimit: 2
			selector: matchLabels: app: context.appName
			strategy: canary: steps: [{
				setWeight: 20
			}, {
				pause: duration: "120s"
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
				metadata: labels: app: context.appName
				spec: containers: [{
					image:           parameter.image
					imagePullPolicy: "Always"
					name:            parameter.image_name
					ports: [{
						containerPort: parameter.targetPort
					}]
				}]
			}
		}
	}
	outputs: {
        service: {
            apiVersion: "v1"
            kind:       "Service"
            spec: {
            selector: {
                app: context.appName
            }
            ports: [{
                port:       parameter.port
                targetPort: parameter.targetPort
            }]
            }
        }
    }

	parameter: {
        image_name: string
        image: string
        replicas: *3 | int
        port: *80 | int
        targetPort: *8080 | int
    }
}

