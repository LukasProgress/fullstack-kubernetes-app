# Fullstack Kubernetes App

### For deployment with minikube:

```
minikube start```

```
kubectl create configmap nginx-html --from-file=frontend/index.html
```

```
kubectl apply -f k8s
```

If the ingress does not work for some reason: 
```
kubectl port-forward svc/nginx 8080:80
```