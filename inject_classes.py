import os
import glob
import re

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find the subheader section: starts with <section ... id="subheader" ... > up to </section>
    # Note: re.DOTALL is needed so . matches newlines
    def subheader_repl(match):
        sub_content = match.group(0)

        # Helper to add class
        def add_class(tag, new_cls, html_chunk):
            def tag_repl(m):
                tag_start = m.group(0)
                # check if class= exists
                if 'class="' in tag_start:
                    return re.sub(r'class="([^"]*)"', f'class="\\1 {new_cls}"', tag_start)
                elif "class='" in tag_start:
                    return re.sub(r"class='([^']*)'", f"class='\\1 {new_cls}'", tag_start)
                else:
                    return tag_start.replace('>', f' class="{new_cls}">')

            # Match <tag> or <tag attr="..."> but not <tag/> or </tag> (well, just the opening tag)
            return re.sub(f'<{tag}(?:\\s+[^>]*?)?>', tag_repl, html_chunk, flags=re.IGNORECASE)

        sub_content = add_class('h5', 'intertxt', sub_content)
        sub_content = add_class('h1', 'midtxt', sub_content)
        sub_content = add_class('p', 'ptxt', sub_content)
        return sub_content

    # The subheader might have form: <section id="subheader"...> ... </section>
    new_content = re.sub(r'<section[^>]*id="subheader"[^>]*>.*?</section>', subheader_repl, content, flags=re.DOTALL | re.IGNORECASE)

    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        return True
    return False

directory = r"c:\Users\user\Desktop\E38 AGENCY\metikon-tem\themes\m"
for filepath in glob.glob(os.path.join(directory, "*.html")):
    process_file(filepath)
print("Done")
