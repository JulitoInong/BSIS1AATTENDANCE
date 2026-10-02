import zipfile
import xml.etree.ElementTree as ET

path = r"c:\Users\Julito\Downloads\BSIS1-A_PROFESSIONAL_PWA_LOCAL_FINAL\FULL LIST BSIS 1-A.docx"
out_path = r"c:\Users\Julito\Downloads\BSIS1-A_PROFESSIONAL_PWA_LOCAL_FINAL\roster_extracted.txt"

with zipfile.ZipFile(path) as z:
    root = ET.fromstring(z.read('word/document.xml'))

ns = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
texts = []
for par in root.findall('.//w:p', ns):
    s = ''.join(node.text or '' for node in par.findall('.//w:t', ns))
    if s.strip():
        texts.append(s)

with open(out_path, 'w', encoding='utf-8') as f:
    f.write('\n'.join(texts))

print(f'Wrote {len(texts)} paragraphs to {out_path}')
