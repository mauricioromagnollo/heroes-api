# Fazer Login no Docker (dockerhub)
docker login 

# Construir a imagem
docker build -t app \
    nodejs-with-postgres-api-example

# Listar as imagens disponíveis
docker image ls | grep postgres

# Criar um apelido para a imagem, com o usuario do dockerhub/repositorio
docker tag app mauricioromagnollo/nodejs-with-postgres-api-example 

# Subir para o dockerhub
docker push mauricioromagnollo/nodejs-with-postgres-api-example 

# Iniciando o Minikube
minikube delete && minikube start

# Visualizando a dashboard do Minikube
minikube dashboard 

# Criando o nosso StatefulSet do Postgres
kubectl create -f postgres-sts.yaml

# Criando o nosso Service do Posrgres
kubectl create -f postgres-svc.yaml

# Criando o Deployment da nossa API
kubectl create -f api-deployment.yaml

# Deletar tudo o que foi criado
kubectl delete -f .

# ---

kubectl get nodes 
kubectl describe nodes 


kubectl get statefulset 
kubectl get pod 
kubectl logs postgres-0

kubectl describe sts postgres
kubectl describe pod postgres-0

kubectl get svc
kubectl describe service postgres-svc

kubectl get deploy
kubectl describe deploy api-heroes
kubectl get pod 
kubectl describe pod api-heroes-5d96dd4c87-wxvhf
kubectl logs api-heroes-5d96dd4c87-wxvhf
kubectl logs -f api-heroes-5d96dd4c87-wxvhf

kubectl apply -f api-deployment.json

minikube service api-heroes-svc --url 

kubectl delete -f .
kubectl create -f .

minikube delete