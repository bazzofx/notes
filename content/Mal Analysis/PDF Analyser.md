

## PDF Structure
Typically, a PDF document comprises four main components:

1. **Header** : This is a simple one-line entry that identifies the document as a PDF and specifies the version of the PDF format being used.
2. **Body** : This section contains the objects that describe the document's content, which can include text, images, and multimedia elements.
3. **Cross-reference Table** : This table serves as an index, pointing to the location of each object within the file. It plays a critical role in the efficient retrieval and rendering of the document.
4. **Trailer** : The trailer holds information necessary for locating the cross-reference table and provides essential cues to start parsing the PDF.

In contrast, the logical structure of a PDF is hierarchical. It begins with a root object identified in the trailer. For instance, in a typical PDF hierarchy, Object 1 might serve as the root, with objects 2 and 3 as its direct children. This hierarchy helps manage and organize the document's content efficiently.

By understanding both the physical and logical structures of PDF files, users and developers can better appreciate their construction, manipulation, and the potential vulnerabilities they may encounter, particularly in scenarios such as malicious document crafting and distribution

![[Pasted image 20250528225418.png]]
[reference image](https://blog.didierstevens.com/2008/04/09/quickpost-about-the-physical-and-logical-structure-of-pdf-files/)

## Tools





















##### Ref
[Filipi article - Malicious PDF](https://labs.segura.blog/unmasking-the-threat-a-deep-dive-into-the-pdf-malicious-2/)