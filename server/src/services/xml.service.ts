const xmlConverter = require('xml-js');

export class XmlService {
  static convertToObject(xml): {[key: string]: any} {
    let converted;
    try {
      converted = xmlConverter.xml2js(xml, { compact: true });
    } catch (e) {}
    return converted
  }

  static convertToXml(object): string {
    let converted;
    try {
      converted = xmlConverter.js2xml(object, {compact: true, ignoreComment: true, spaces: 4});
    } catch (e) {}
    return converted
  }
}
