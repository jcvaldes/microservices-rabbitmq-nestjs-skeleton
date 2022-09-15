FROM rabbitmq:3.10.7-management-alpine
# Install RabbitMQ.
RUN apt-get update && \
  rabbitmq-plugins enable rabbitmq_management && \
  rabbitmq-plugins enable --offline rabbitmq_mqtt rabbitmq_federation_management rabbitmq_stomp

