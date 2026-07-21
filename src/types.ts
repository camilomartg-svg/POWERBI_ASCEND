export interface DIKWLevel {
  id: 'data' | 'information' | 'knowledge' | 'wisdom';
  title: string;
  definition: string;
  exampleTitle: string;
  exampleDesc: string;
  value: string | number;
  bimVisualName: string;
}

export interface Slide {
  id: string;
  title: string;
  subtitle: string;
  category: string;
}

export interface PresentationSettings {
  courseName: string;
  instructorName: string;
  institution: string;
  dikwData: {
    data: { label: string; value: string; desc: string };
    information: { label: string; value: string; desc: string };
    knowledge: { label: string; value: string; desc: string };
    wisdom: { label: string; value: string; desc: string };
  };
}
