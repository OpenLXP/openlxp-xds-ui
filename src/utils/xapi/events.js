import { sendStatement } from '@/utils/xapi';

export function searched(keyword) {
  const context = {
    verb: 'searched',
    object: {
      id: `${window.location.origin}/search`,
      definitionName: 'ECC Search Capability',
    },
    resultExtName: 'https://w3id.org/xapi/ecc/result/extensions/searchTerm',
    resultExtValue: keyword,
  };
  sendStatement(context);
}
