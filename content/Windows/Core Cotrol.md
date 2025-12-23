# Info
The below commands were used to change the settings of the CPU Core controls on Windows.
Those options were disabled until the regkey was changed. which enabled CPU Core options to be modified.

1)Method RegEdit
Computer\HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\DeviceGuard\Scenarios\CredentialGuard REG_DWORD should be 0.

Computer\HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\DeviceGuard\Scenarios\HypervisorEnforcedCodeIntegrity 
REG_DWORD should be 0

2)Method remove manage by admin
reg add HKLM\SYSTEM\CurrentControlSet\Control\DeviceGuard\Scenarios\HypervisorEnforcedCodeIntegrity /v "WasEnabledBy" /t REG_DWORD /d 2 /f
