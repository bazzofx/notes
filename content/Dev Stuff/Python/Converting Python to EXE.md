
## For Python 2 use  py2exe script:

1. Install py2exe.
    [SourceForge Link](https://sourceforge.net/projects/py2exe-converter/)
    
2. Create a `setup.py` file in the same directory as your script. For example, if your script is named `myscript.py`, your `setup.py` might look like this:
    
    ```
    from distutils.core import setup
    import py2exe
    
    setup(console=['myscript.py'])
    ```
    
3. Run the command `python setup.py py2exe` from the command prompt to create the executable.5
    

## For Python 3 scripts, you can use auto-py-to-exe:

1. Install auto-py-to-exe via pip.
```
pip install auto-py-to-exe
```
    
2. Run the command to open the graphical interface.
```
 auto-py-to-exe
```

3. Use the interface to select your Python script and configure the conversion options.