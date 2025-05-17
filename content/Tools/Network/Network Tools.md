
## Trippy
[Github link](fujiapple852/trippy: A network diagnostic tool](https://github.com/fujiapple852/trippy)
[Notes Refence](CLI Reference | Trippy](https://trippy.rs/reference/cli/)


#### Notes
If you are seeing "?" when running Trippy, this is how the characters are rendered on DOS/Powershell, to avoid that use an app like Terminal
![[Pasted image 20250311011340.png]]

To enable AS lookup you use the `--dns-lookup-as-info` (`-z`) option. However, AS lookup is not supported for the default system DNS resolver and so you need to pick one of the others (i.e. Google's `8.8.8.8`) with the `--dns-resolve-method` (`-r`) option. The command therefore becomes:

```
trip example.com -r google -z
```

To enable GeoIp information you need a MaxMind GeoIp `mmdb` database file, which you provide with the `--geoip-mmdb-file` (`-G`) option. Note that from Trippy `0.10.x`, both MaxMind and IpInfo mmdb files may be used. You can optionally adjust how GeoIp information is displayed with the `--tui-geoip-mode` option. Therefore, your command could be:

```
trip example.com --geoip-mmdb-file GeoLite2-City.mmdb --tui-geoip-mode short
```

To avoid providing these options every time you run Trippy you can set them permanently in a `trippy.toml` [config file](https://github.com/fujiapple852/trippy?tab=readme-ov-file#configuration-reference).

Combining these, your config file would become:

```toml
[dns]
dns-resolve-method = "google"
dns-lookup-as-info = true

[tui]
geoip-mmdb-file = "/path/to/GeoLite2-City.mmdb"
tui-geoip-mode = "short"
```

> Pressing 's' would show up the settings however I don't know how to change them

## SysDig
SysDig (Monitorign like a pro)

[Github link](draios/sysdig: Linux system exploration and troubleshooting tool with first class support for containers](https://github.com/draios/sysdig/?tab=readme-ov-file)

[Sysdig Open Getting Started Video](https://www.youtube.com/watch?v=UJ4wVrbP-Q8&ab_channel=Sysdig)