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

export function curated(listId, listName, listDescription) {
  const context = {
    verb: 'curated',
    object: {
      id: `${window.location.origin}/lists/${listId}`,
      definitionName: listName,
      description: listDescription,
    },
    resultExtName: 'https://w3id.org/xapi/ecc/result/extensions/CuratedListId',
    resultExtValue: listId,
  };
  sendStatement(context);
}
