
| Key                                                                    | Mode       | Description                 |
| ---------------------------------------------------------------------- | ---------- | --------------------------- |
| Registry::HKEY_CLASSES_ROOT\AllFileSystemObjects\shell\OpenWithSquidra | Admin Mode | Right Click Context on File |
|Registry::HKEY_CURRENT_USER\Software\Classes\*\shell\OpenWithSquidra    | User Mode  | Right Click Context on File|
|HKCR:\DesktopBackground\shell\OpenWithSquidra                           | Admin Mode | Right Click Menu Desktop    |
|Registry::HKEY_CURRENT_USER\Software\Classes\DesktopBackground\shell\OpenWithSquidra| User Mode |Right Click Menu Desktop|

# Example Adding Key
## Shift Right Click Menu on a File

### 🗝️ Open with Ghidra! 
## RegKey User Space - Right Click Context
- "Registry::HKEY_CURRENT_USER\Software\Classes\*\shell\OpenWithSquidra"
- "Registry::HKEY_CURRENT_USER\Software\Classes\*\shell\OpenWithSquidra\command"
#### Why it works
- HKCU\Software\Classes\*\shell is merged into the effective * class at runtime.
- The verb appears on every file type (including folders) for the current user only.

| Name                               | Type                      | Data                                          | Notes                                                       |
| ---------------------------------- | ------------------------- | --------------------------------------------- | ----------------------------------------------------------- |
| _(Default)_                        | **REG_SZ** (String Value) | `Open with Ghidra`                            | The menu label shown in the right-click menu                |
| Icon                               | **REG_SZ** (String Value) | `C:\Users\Public\Pictures\ghidra.ico          | Optional — sets the PowerShell icon                         |
| Position                           | **REG_SZ** (String Value) | `Top`                                         | Optional — determines position in the menu                  |
| _(Default)_ (inside `command` key) | **REG_SZ** (String Value) | `cmd.exe /k cd /d C:\ && color 4F && dir /s"` | Will open cmd, change the screen red, and run dir recursive |

# PowerShell
## Add & Remove Keys using Powershell
### dd-OpenWithSquidraMenu
```powershell
function Add-OpenWithSquidraMenu {
    #$baseKey = "HKCR:\DesktopBackground\shell\OpenWithSquidra"
    #$baseKey = "Registry::HKEY_CLASSES_ROOT\AllFileSystemObjects\shell\OpenWithSquidra" #requires Admin
    $baseKey = "Registry::HKEY_CURRENT_USER\Software\Classes\*\shell\OpenWithSquidra"

    $commandKey = "$baseKey\command"

    # Create base key
    if (-not (Test-Path $baseKey)) {
        New-Item -Path $baseKey -Force | Out-Null
    }

    # Set default menu label
    Set-ItemProperty -Path $baseKey -Name "(Default)" -Value "Open with Ghidra"

    # Set icon (optional)
    Set-ItemProperty -Path $baseKey -Name "Icon" -Value "C:\Users\Public\Pictures\ghidra.ico"

    # Set position (optional)
    Set-ItemProperty -Path $baseKey -Name "Position" -Value "Top"

    # Create command subkey
    if (-not (Test-Path $commandKey)) {
        New-Item -Path $commandKey -Force | Out-Null
    }

    # Set command to run
    Set-ItemProperty -Path $commandKey -Name "(Default)" -Value 'cmd.exe /k cd /d C:\ && color 4F && dir /s'

    Write-Output "Right-click menu 'OpenWithSquidra' added successfully."
}
```
### Remove-OpenWithSquidraMenu
```powershell
function Remove-OpenWithSquidraMenu {
    #$baseKey = "HKCR:\DesktopBackground\shell\OpenWithSquidra" # Normal Right Click
    #$baseKey = "Registry::HKEY_CLASSES_ROOT\AllFileSystemObjects\shell\OpenWithSquidra" #requires admin
    $baseKey = "Registry::HKEY_CURRENT_USER\Software\Classes\*\shell\OpenWithSquidra"

    if (Test-Path $baseKey) {
        Remove-Item -Path $baseKey -Recurse -Force
        Write-Output "Right-click menu 'OpenWithSquidra' removed successfully."
    } else {
        Write-Output "Right-click menu 'OpenWithSquidra' does not exist."
    }
}
```