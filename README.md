<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Ambiente desarrollo

1. Levantamos rabbitmq

```
docker-compose up -d
```

2. Entramos al rabbit y configuramos el virtualhost en la solapa Admin

Add virtual host: loyalty

3. Creamos las filas

Presionamos en "Add new queue" y seleccionamos el virtual host fidelity y le damos los siguientes nombres, si no aparece virtual host es porque se configuro uno por defecto llamado loyalty en el docker-compose por lo tanto mientras no se cree otro
virtual host van a ir todas las colas bajo ese virtual host

admin-backend
notifications
