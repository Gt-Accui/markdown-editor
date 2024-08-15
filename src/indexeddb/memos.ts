import Dexie from "dexie";

// TypeScript の型定義であって IndexedDB に対する設定ではない
export interface MemoRecords {
    datetime: string
    title: string
    text: string
};

const database = new Dexie("markdown-editor");

// stores({ TableName: "&KeyItemName" })
database.version(1).stores({ memos: "&datetime" });

// Table<TypeOfData, TypeOfKey>
const memos: Dexie.Table<MemoRecords, string> = database.table("memos");

export const putMemo = async (title: string, text: string): Promise<void> => {
    const datetime = new Date().toISOString();

    await memos.put({datetime, title, text});
};
