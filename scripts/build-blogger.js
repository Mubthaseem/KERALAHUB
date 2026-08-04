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

// Clean up any double-nested attribute artifacts
html = html.replaceAll('crossorigin="crossorigin="anonymous""', 'crossorigin="anonymous"');
html = html.replaceAll('crossorigin="crossorigin"', 'crossorigin="anonymous"');
html = html.replaceAll('crossorigin=""', 'crossorigin="anonymous"');
html = html.replaceAll('crossorigin ', 'crossorigin="anonymous" ');
html = html.replaceAll('crossorigin>', 'crossorigin="anonymous">');

// Fix self-closing tags for link and meta
html = html.replace(/<link([^>]*)(?<!\/)>/gi, '<link$1 />');
html = html.replace(/<meta([^>]*)(?<!\/)>/gi, '<meta$1 />');

// Process script tags with JS Unicode escaping (\u003c, \u003e, \u0026)
html = html.replace(/<script([^>]*)>([\s\S]*?)<\/script>/gi, (match, attrs, code) => {
  if (!code.trim()) return match;
  
  let cleanAttrs = attrs
    .replaceAll('crossorigin="crossorigin="anonymous""', 'crossorigin="anonymous"')
    .replaceAll('crossorigin="crossorigin"', 'crossorigin="anonymous"')
    .replaceAll('crossorigin=""', 'crossorigin="anonymous"')
    .replaceAll('crossorigin ', 'crossorigin="anonymous" ')
    .replaceAll('crossorigin>', 'crossorigin="anonymous">');
  
  if (!cleanAttrs.includes('type=')) {
    cleanAttrs += ' type="text/javascript"';
  }

  const xmlSafeJs = code
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026');
  
  return `<script${cleanAttrs}>\n//<![CDATA[\n${xmlSafeJs}\n//]]>\n</script>`;
});

// Process style tags
html = html.replace(/<style([^>]*)>([\s\S]*?)<\/style>/gi, (match, attrs, css) => {
  if (!css.trim()) return match;
  const safeCss = css.replace(/\]\]>/g, ']]]]><![CDATA[>');
  return `<style${attrs}>\n/*<![CDATA[*/\n${safeCss}\n/*]]>*/\n</style>`;
});

let headContent = html.substring(html.indexOf('<head>') + 6, html.indexOf('</head>'));
let bodyContent = html.substring(html.indexOf('<body'), html.indexOf('</body>') + 7);

// Clean up duplicate head metas/titles & broken crossorigin
headContent = headContent.replaceAll('crossorigin="crossorigin="anonymous""', 'crossorigin="anonymous"');
headContent = headContent.replaceAll('crossorigin="crossorigin"', 'crossorigin="anonymous"');
headContent = headContent.replaceAll('crossorigin=""', 'crossorigin="anonymous"');
headContent = headContent.replaceAll('crossorigin ', 'crossorigin="anonymous" ');
headContent = headContent.replaceAll('crossorigin>', 'crossorigin="anonymous">');

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
console.log('Successfully updated blogger_theme.xml with clean crossorigin attributes!');
