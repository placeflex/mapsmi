interface LayoutProps {
  nameLayout?: string | undefined;
  headerName?: string;
  subheaderName?: string;
  description?: string;
  size?: string;
  colorScheme?: string;
  figure: React.ReactNode | string;
}

export class Layout {
  nameLayout?: string;
  headerName?: string;
  subheaderName?: string;
  description?: string;
  figure: React.ReactNode | string;

  constructor({
    nameLayout = "",
    headerName = "",
    subheaderName = "",
    description = "",
    figure = 1,
  }: LayoutProps) {
    this.nameLayout = nameLayout;
    this.headerName = headerName;
    this.subheaderName = subheaderName;
    this.description = description;
    this.figure = figure;
  }

  print() {}

  get figures() {
    return this.figure;
  }

  set figures(id) {
    this.figure = id;
  }

  get nameValue() {
    return this.headerName;
  }

  set nameValue(name: any) {
    this.headerName = name;
  }
}
