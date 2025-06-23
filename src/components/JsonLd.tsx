import React from 'react';

interface JsonLdProps {
  type: 'Organization' | 'WebSite' | 'BreadcrumbList' | 'Product' | 'Service';
  data: any;
}

const JsonLd: React.FC<JsonLdProps> = ({ type, data }) => {
  const getStructuredData = () => {
    const baseData = {
      '@context': 'https://schema.org',
      '@type': type,
      ...data,
    };

    return JSON.stringify(baseData);
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: getStructuredData() }}
    />
  );
};

export default JsonLd;

// Örnek kullanımlar:

export const organizationJsonLd = {
  name: 'MapperX',
  url: 'https://mapperx.com',
  logo: 'https://mapperx.com/logo.svg',
  sameAs: [
    'https://twitter.com/MapperX',
    'https://linkedin.com/company/mapperx',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+90-xxx-xxx-xxxx',
    contactType: 'customer service',
    areaServed: ['TR', 'EN', 'DE', 'FR', 'IT'],
    availableLanguage: ['Turkish', 'English', 'German', 'French', 'Italian'],
  },
};

export const websiteJsonLd = {
  name: 'MapperX',
  url: 'https://mapperx.com',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://mapperx.com/search?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
};

export const serviceJsonLd = {
  name: 'Termografik Muayene',
  provider: {
    '@type': 'Organization',
    name: 'MapperX',
  },
  areaServed: {
    '@type': 'Country',
    name: 'Turkey',
  },
  description: 'Güneş enerjisi santrallerinde yapay zeka destekli otonom termografik muayene hizmeti',
  serviceType: 'Solar Panel Inspection',
}; 