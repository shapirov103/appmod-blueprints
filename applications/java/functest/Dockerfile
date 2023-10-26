FROM ubuntu:latest

RUN apt-get update && apt-get install -y curl \
    && rm -rf /var/lib/apt/lists/*
# Copy the script to the container
COPY javaFunctest.sh /
RUN chmod +x /javaFunctest.sh
# Set the entrypoint to the script with CMD arguments
ENTRYPOINT ["/javaFunctest.sh"]
CMD ["INGRESS_URL", "SUCCESS_COLOUR"]

