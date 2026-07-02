Tutorial Video
This model is from Microsoft and it focus in using CPU power instead of GPU.
>[NOTE]
>However, from my tests, it was performing worse than other GPU models.


https://www.youtube.com/watch?v=vkQJ2lJzjKY

## Clone Repo

```bash
git clone --recursive https://github.com/microsoft/BitNet.git
cd BitNet
```
## Install Dependencies

```bash
python -m venv venv
scripts/bin/activate
```
## Extra Installations
Install cmake
- cmake

https://cmake.org/download/

Add to %PATH%

Re-open Terminal and confirm its installed
```bash
cmake --version
```

Install clang
- clang

https://github.com/llvm/llvm-project/releases

Add to %PATH%

Re-open Terminal and confirm its installed
```bash
clang --version
```

- Visual Studio Clang

- C++ Clang tools for Windows

## ✔️ Necessary Extra Fixes
If you encounter any errors during installation perform the below fixes
#### ✔️ Step 1

Find the following line in `src/ggml-bitnet-mad.cpp (around line 811)`

```C++

int8_t * y_col = y + col * by;

```

and change it to:

```C++

const int8_t * y_col = y + col * by;

```


----

#### ✔️ Step 2

Add to the very top of each of the files below 

`common.cpp files`
`log.cpp`
`imatrix.cpp`
`perplexity.cpp`

```c++

#include <chrono>  

```