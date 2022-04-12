export default class ConfigPart {
  type: string;
  icon?: string | undefined;
  found: { field: string; searchTerm: string } | undefined;
  linkToAttribute: string | undefined;
  viewEntity: { linkedBy: string; fieldsDisplayed: string[] } | undefined;
  connector: { subEntityName: string; subEntityField: string } | undefined;

  constructor(
    type: string,
    icon?: string,
    found?: { field: string; searchTerm: string },
    linkToAttribute?: string,
    viewEntity?: { linkedBy: string; fieldsDisplayed: string[] },
    connector?: { subEntityName: string; subEntityField: string }
  ) {
    this.type = type;
    this.icon = icon;
    this.found = found;
    this.linkToAttribute = linkToAttribute;
    this.viewEntity = viewEntity;
    this.connector = connector;
  }
}
