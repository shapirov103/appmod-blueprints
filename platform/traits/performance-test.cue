,
        analysis: {
            apiVersion: argoproj.io/v1alpha1
            kind: AnalysisTemplate
            metadata:
            name: functional-test
            spec:
            args:
            - name: service-name
            metrics:
            - name: test
                provider:
                job:
                    metadata:
                    annotations:
                        foo: bar # annotations defined here will be copied to the Job object
                    labels:
                        foo: bar # labels defined here will be copied to the Job object
                    spec:
                        backoffLimit: 1
                        template:
                            spec:
                            containers:
                            - name: test
                                image: my-image:latest
                                command: [my-test-script, my-service.default.svc.cluster.local]
                            restartPolicy: Never

        }