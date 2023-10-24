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
		metadata: {
            name: context.name
        } 
		spec: {
			replicas:             parameter.replicas
			revisionHistoryLimit: 2
			selector: matchLabels: app: context.name
			strategy: canary: steps: [{
				setWeight: 20
			}, {
				pause: duration: "20s"
			}, {
				setWeight: 40
			}, {
				pause: duration: "20s"
			}, {
				setWeight: 80
			}, {
				pause: duration: "60s"
			},{
                analysis: {
                    templates: [
                        {
                            templateName: "functional-gate-\(context.name)"
                        }
                    ],
                    args: [
                        {
                            name: "service-name",
                            value: context.name
                        }
                    ]
                }
            }
            ]
			template: {
				metadata: labels: app: context.name
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
        "appmod-service-service": {
            apiVersion: "v1"
            kind:       "Service"
            metadata: name: context.name
            spec: {
            selector: {
                app: context.name
            }
            ports: [{
                port:       parameter.port
                targetPort: parameter.targetPort
            }]
            }
        },
        "appmod-functional-analysis-template": {
            kind: "AnalysisTemplate",
            apiVersion: "argoproj.io/v1alpha1",
            metadata: {
                name: "functional-gate-\(context.name)"
            },
            spec: {
                metrics: [
                    {
                        "name": "\(context.name)-metrics",
                        "provider": {
                            "job": {
                                "spec": {
                                    "template": {
                                        "spec": {
                                            "containers": [
                                                {
                                                    "name": "sleep",
                                                    "image": "alpine:3.8",
                                                    "command": [
                                                        "sh",
                                                        "-c"
                                                    ],
                                                    "args": [
                                                        "exit 0"
                                                    ]
                                                }
                                            ],
                                            "restartPolicy": "Never"
                                        }
                                    },
                                    "backoffLimit": 0
                                }
                            }
                        }
                    }
                ]
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

