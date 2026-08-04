import fs from 'fs';
import path from 'path';

const distHtmlPath = path.resolve('dist/index.html');
const outputXmlPath = path.resolve('blogger_theme.xml');
const outputHtmlPath = path.resolve('blogger_standalone.html');

if (!fs.existsSync(distHtmlPath)) {
  console.error('dist/index.html not found! Run npm run build first.');
  process.exit(1);
}

let html = fs.readFileSync(distHtmlPath, 'utf-8');

// 1. Convert HTML boolean attributes to strict XML attribute="value" syntax
html = html.replace(/\bcrossorigin\b(?!\s*=)/gi, 'crossorigin="anonymous"');
html = html.replace(/\basync\b(?!\s*=)/gi, 'async="async"');
html = html.replace(/\bdefer\b(?!\s*=)/gi, 'defer="defer"');

// 2. Fix self-closing tags
html = html.replace(/<link([^>]*)(?<!\/)>/gi, '<link$1 />');
html = html.replace(/<meta([^>]*)(?<!\/)>/gi, '<meta$1 />');

// 3. Extract script contents and wrap in Blogger official //<![CDATA[ ... //]]>
html = html.replace(/<script([^>]*)>([\s\S]*?)<\/script>/gi, (match, attrs, code) => {
  if (!code.trim()) return match;
  
  // Clean attributes for XML
  let cleanAttrs = attrs
    .replace(/\bcrossorigin\b(?!\s*=)/gi, 'crossorigin="anonymous"')
    .replace(/\basync\b(?!\s*=)/gi, 'async="async"')
    .replace(/\bdefer\b(?!\s*=)/gi, 'defer="defer"');
  
  // Ensure type='text/javascript'
  if (!cleanAttrs.includes('type=')) {
    cleanAttrs += ' type="text/javascript"';
  }
  
  // Sanitize any CDATA end tags inside code
  const safeCode = code.replace(/\]\]>/g, ']]]]><![CDATA[>');
  
  return `<script${cleanAttrs}>\n//<![CDATA[\n${safeCode}\n//]]>\n</script>`;
});

// 4. Wrap style contents in Blogger official CDATA
html = html.replace(/<style([^>]*)>([\s\S]*?)<\/style>/gi, (match, attrs, css) => {
  if (!css.trim()) return match;
  const safeCss = css.replace(/\]\]>/g, ']]]]><![CDATA[>');
  return `<style${attrs}>\n/*<![CDATA[*/\n${safeCss}\n/*]]>*/\n</style>`;
});

// Extract head and body
let headContent = html.substring(html.indexOf('<head>') + 6, html.indexOf('</head>'));
let bodyContent = html.substring(html.indexOf('<body'), html.indexOf('</body>') + 7);

// 5. Construct 100% valid Blogger SAX XML template
const bloggerXml = `<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE html>
<html b:css='false' b:responsive='true' xmlns='http://www.w3.org/1999/xhtml' xmlns:b='http://www.google.com/2005/gml/b' xmlns:data='http://www.google.com/2005/gml/data' xmlns:expr='http://www.google.com/2005/gml/expr'>
<head>
  <meta charset='UTF-8'/>
  <meta content='width=device-width, initial-scale=1.0' name='viewport'/>
  <title><data:blog.pageTitle/></title>
  
  <b:skin><![CDATA[
    body { margin: 0; padding: 0; background: #f8fafc; color: #0f172a; }
  ]]></b:skin>
  
  ${headContent}
</head>
${bodyContent}
  <div style='display:none;'>
    <b:section id='main' showaddelement='yes'>
      <b:widget id='Blog1' locked='true' title='Blog Posts' type='Blog'/>
    </b:section>
  </div>
</html>`;

fs.writeFileSync(outputXmlPath, bloggerXml, 'utf-8');
fs.writeFileSync(outputHtmlPath, bloggerXml, 'utf-8');
console.log('Successfully updated blogger_theme.xml and blogger_standalone.html with Blogger //<![CDATA[');
