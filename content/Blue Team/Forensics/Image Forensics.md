Using a simple online tool we can identify if an image has been modified or not

- [Web Image Forensics Tool by 29a.ch](https://29a.ch/photo-forensics/#error-level-analysis)


## The Analysis Tools

Forensically describes itself as "a kind of magnifying glass" that helps you see details that would otherwise be hidden. It ships with an impressive array of tools:

### Error Level Analysis (ELA)

This is perhaps the most well-known technique in the suite. ELA compares an image to a recompressed version of itself, making manipulated regions stand out. Edited areas may appear darker or brighter than untouched regions due to differences in compression artifacts. Users can adjust JPEG quality, error scale, and opacity to fine-tune results. The tool includes a magnifier enhancement and links to external tutorials for deeper learning.

### Clone Detection

The clone detector highlights similar regions within an image—a strong indicator that the clone stamp tool was used to cover or duplicate content. Similar regions are marked in blue and connected with red lines. Adjustable parameters include minimal similarity, minimal detail, minimal cluster size, and block size. While the creator notes this tool is "not yet very refined," it remains a valuable first-pass detector.

### Noise Analysis

This reverse-denoising algorithm isolates noise by removing the rest of the image using a separable median filter. It excels at revealing airbrushing, deformations, warping, and perspective-corrected cloning. The tool works best on high-quality images and offers noise amplitude, histogram equalization, and opacity controls.

### Level Sweep

A quick way to sweep through an image's histogram, this tool magnifies the contrast of specific brightness levels. It's particularly useful for spotting edges introduced by copy-paste operations. Users simply scroll their mouse wheel over the image to sweep through values.

### Luminance Gradient

This tool analyzes brightness changes along the x and y axes, revealing inconsistencies in lighting and shadows. Parts of an image under similar illumination should have similar gradients; sharp discontinuities can indicate manipulation.

### Principal Component Analysis (PCA)

PCA provides a different mathematical angle for viewing image data, making certain manipulations easier to spot. It supports projection, difference, distance, and component modes, with adjustable component selection and linearization options.

### Magnifier

A foundational tool that enlarges pixels and enhances contrast within a window. Three enhancement modes are available: Histogram Equalization (most robust), Auto Contrast, and Auto Contrast by Channel.

## Metadata and File Analysis

Beyond pixel-level analysis, Forensically offers powerful metadata tools:

- **Meta Data**: Displays hidden EXIF data embedded in images.
    
- **Geo Tags**: Shows GPS coordinates where a photo was taken, if stored.
    
- **Thumbnail Analysis**: Reveals hidden preview images that may expose details of the original or the camera used.
    
- **C2PA Content Authenticity**: Displays C2PA/JUMBF content authenticity metadata, with a note that even signed metadata isn't inherently trustworthy.
    
- **JPEG Analysis**: Extracts quantization tables, comments, and file structure. Since different software and cameras use distinct quantization matrices, this can reveal whether a file was edited or resaved.
    
- **String Extraction**: Scans binary content for ASCII sequences, helping uncover metadata in formats Forensically doesn't natively parse. A notable example is the `bFBMD` string added by Facebook to some images.


## Practical Applications

Forensically is useful across many scenarios:

- **Journalism and fact-checking**: Verifying user-generated content before publication.
    
- **Security investigations**: Analyzing images for evidence of tampering.
    
- **Academic research**: Studying image manipulation techniques.
    
- **Personal curiosity**: Satisfying questions about whether an image is authentic.
## Limitations and Considerations

The tool's creator is refreshingly honest about limitations. ELA results "can be misleading," and the clone detector is "not yet very refined." RAW image formats are not supported—the highest quality input is 24-bit PNG. Additionally, while metadata can be informative, it isn't inherently trustworthy.

## Getting Started

Forensically requires no installation or account. Simply visit the website, open an image, and begin exploring. The interface is intuitive, with helpful tooltips and a tutorial video for newcomers. For those wanting to go deeper, the creator's blog posts and linked academic papers provide excellent context.

## Example Forensics

### Original
![[Pasted image 20260202231849.png]]

### Forensics Image
![[Pasted image 20260202231924.png]]
### Explanation
![[Pasted image 20260202231937.png]]


### Example 2

### Original from Scam Email
This is from an email where the actor is trying to engage with me to get his help to promote one of my Chrome Extensions. Clearly this is an obvious very common phishing tactic but we can also confirm that by analysing the images he sent across, which I knew where photoshoped.

![[email_.png]]

### Analyzsis
The second Image which had a **high count of views, downloads** was clearly false. Using the tool we can see the hidden `rectangular snip` element which shows clearly evidence it was manipulated and it was not just a screenshot taken from the monitor.
![[fake 3.png]]
