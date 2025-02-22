/*
 * Copyright (C) Contributors to the Suwayomi project
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import gql from 'graphql-tag';
import { FULL_CHAPTER_FIELDS } from '@/lib/graphql/Fragments';

export const DELETE_CHAPTER_METADATA = gql`
    mutation DELETE_CHAPTER_METADATA($input: DeleteChapterMetaInput!) {
        deleteChapterMeta(input: $input) {
            clientMutationId
            meta {
                key
                value
                chapter {
                    id
                    meta {
                        key
                        value
                    }
                }
            }
            chapter {
                id
                meta {
                    key
                    value
                }
            }
        }
    }
`;

// makes the server fetch and return the pages of a chapter
export const GET_CHAPTER_PAGES_FETCH = gql`
    mutation GET_CHAPTER_PAGES_FETCH($input: FetchChapterPagesInput!) {
        fetchChapterPages(input: $input) {
            clientMutationId
            chapter {
                id
                pageCount
            }
            pages
        }
    }
`;

// makes the server fetch and return the chapters of the manga
export const GET_MANGA_CHAPTERS_FETCH = gql`
    ${FULL_CHAPTER_FIELDS}
    mutation GET_MANGA_CHAPTERS_FETCH($input: FetchChaptersInput!) {
        fetchChapters(input: $input) {
            clientMutationId
            chapters {
                ...FULL_CHAPTER_FIELDS
            }
        }
    }
`;

export const SET_CHAPTER_METADATA = gql`
    mutation SET_CHAPTER_METADATA($input: SetChapterMetaInput!) {
        setChapterMeta(input: $input) {
            clientMutationId
            meta {
                key
                value
                chapter {
                    id
                    meta {
                        key
                        value
                    }
                }
            }
        }
    }
`;

export const UPDATE_CHAPTER = gql`
    mutation UPDATE_CHAPTER(
        $input: UpdateChapterInput!
        $getBookmarked: Boolean!
        $getRead: Boolean!
        $getLastPageRead: Boolean!
        $id: Int!
        $chapterIdToDelete: Int!
        $deleteChapter: Boolean!
        $mangaId: Int!
        $downloadAhead: Boolean!
    ) {
        updateChapter(input: $input) {
            clientMutationId
            chapter {
                id
                isBookmarked @include(if: $getBookmarked)
                isRead @include(if: $getRead)
                lastReadAt @include(if: $getRead)
                lastPageRead @include(if: $getLastPageRead)
                manga @include(if: $getRead) {
                    id
                    unreadCount
                    lastReadChapter {
                        id
                    }
                    latestReadChapter {
                        id
                    }
                }
            }
        }
        deleteDownloadedChapter(input: { id: $chapterIdToDelete }) @include(if: $deleteChapter) {
            clientMutationId
            chapters {
                id
                isDownloaded
                manga {
                    id
                    downloadCount
                }
            }
        }
        downloadAhead(input: { mangaIds: [$mangaId], latestReadChapterIds: [$id] }) @include(if: $downloadAhead) {
            clientMutationId
        }
    }
`;

export const UPDATE_CHAPTERS = gql`
    mutation UPDATE_CHAPTERS(
        $input: UpdateChaptersInput!
        $getBookmarked: Boolean!
        $getRead: Boolean!
        $getLastPageRead: Boolean!
        $chapterIdsToDelete: [Int!]!
        $deleteChapters: Boolean!
        $mangaIds: [Int!]!
        $latestReadChapterIds: [Int!]!
        $downloadAhead: Boolean!
    ) {
        updateChapters(input: $input) {
            clientMutationId
            chapters {
                id
                isBookmarked @include(if: $getBookmarked)
                isRead @include(if: $getRead)
                lastReadAt @include(if: $getRead)
                lastPageRead @include(if: $getLastPageRead)
                manga @include(if: $getRead) {
                    id
                    unreadCount
                    lastReadChapter {
                        id
                    }
                    latestReadChapter {
                        id
                    }
                }
            }
        }
        deleteDownloadedChapters(input: { ids: $chapterIdsToDelete }) @include(if: $deleteChapters) {
            clientMutationId
            chapters {
                id
                isDownloaded
                manga {
                    id
                    downloadCount
                }
            }
        }
        downloadAhead(input: { mangaIds: $mangaIds, latestReadChapterIds: $latestReadChapterIds })
            @include(if: $downloadAhead) {
            clientMutationId
        }
    }
`;
