FROM ubuntu:latest

RUN apt-get update && apt-get install -y curl apache2 apache2-doc apache2-utils\
    && rm -rf /var/lib/apt/lists/*


COPY javaPerftest.sh /
RUN chmod +x /javaPerftest.sh
# Set the entrypoint to the script with CMD arguments
ENTRYPOINT ["/javaPerftest.sh"]
CMD ["ingressurl", "expectedtimeout" ]
