It compiles the result file into an executable. Running from Windows will compile into an **.exe** file. While on Mac and Linux it has no file extension.
- -o give a name to the output file
```
go build hello.go
```
Below command will create a **go.mod** file that contains the modules for the application and minimum go version.
```
go mode init com.example/hello
```