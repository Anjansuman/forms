/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/forms_contract.json`.
 */
export type FormsContract = {
  "address": "7LH4wHecq4RTHec87zdEaTWRZVceM9RRzoZKPA4nBTs6",
  "metadata": {
    "name": "formsContract",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "closeForm",
      "discriminator": [
        58,
        128,
        2,
        243,
        149,
        169,
        144,
        144
      ],
      "accounts": [
        {
          "name": "formMetadata",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  102,
                  111,
                  114,
                  109,
                  95,
                  109,
                  101,
                  116,
                  97,
                  100,
                  97,
                  116,
                  97
                ]
              },
              {
                "kind": "account",
                "path": "form_metadata.creator",
                "account": "formMetaData"
              },
              {
                "kind": "arg",
                "path": "formId"
              }
            ]
          }
        },
        {
          "name": "creator",
          "writable": true,
          "signer": true
        }
      ],
      "args": [
        {
          "name": "formId",
          "type": "u64"
        }
      ]
    },
    {
      "name": "createForm",
      "discriminator": [
        161,
        144,
        144,
        121,
        140,
        175,
        192,
        44
      ],
      "accounts": [
        {
          "name": "formMetadata",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  102,
                  111,
                  114,
                  109,
                  95,
                  109,
                  101,
                  116,
                  97,
                  100,
                  97,
                  116,
                  97
                ]
              },
              {
                "kind": "account",
                "path": "creator"
              },
              {
                "kind": "arg",
                "path": "formId"
              }
            ]
          }
        },
        {
          "name": "creator",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "formId",
          "type": "u64"
        },
        {
          "name": "title",
          "type": "string"
        },
        {
          "name": "description",
          "type": "string"
        },
        {
          "name": "formSchema",
          "type": {
            "vec": {
              "defined": {
                "name": "formField"
              }
            }
          }
        }
      ]
    },
    {
      "name": "deleteResponse",
      "discriminator": [
        163,
        72,
        11,
        68,
        134,
        42,
        101,
        26
      ],
      "accounts": [
        {
          "name": "responseAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  102,
                  111,
                  114,
                  109,
                  95,
                  114,
                  101,
                  115,
                  112,
                  111,
                  110,
                  115,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "responder"
              },
              {
                "kind": "arg",
                "path": "formId"
              }
            ]
          }
        },
        {
          "name": "responder",
          "writable": true,
          "signer": true
        }
      ],
      "args": [
        {
          "name": "formId",
          "type": "u64"
        }
      ]
    },
    {
      "name": "submitResponse",
      "discriminator": [
        85,
        190,
        208,
        119,
        243,
        52,
        133,
        90
      ],
      "accounts": [
        {
          "name": "formMetadata",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  102,
                  111,
                  114,
                  109,
                  95,
                  109,
                  101,
                  116,
                  97,
                  100,
                  97,
                  116,
                  97
                ]
              },
              {
                "kind": "account",
                "path": "form_metadata.creator",
                "account": "formMetaData"
              },
              {
                "kind": "arg",
                "path": "formId"
              }
            ]
          }
        },
        {
          "name": "responseAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  102,
                  111,
                  114,
                  109,
                  95,
                  114,
                  101,
                  115,
                  112,
                  111,
                  110,
                  115,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "responder"
              },
              {
                "kind": "arg",
                "path": "formId"
              }
            ]
          }
        },
        {
          "name": "responder",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "formId",
          "type": "u64"
        },
        {
          "name": "answers",
          "type": "bytes"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "formMetaData",
      "discriminator": [
        149,
        227,
        223,
        133,
        190,
        43,
        60,
        237
      ]
    },
    {
      "name": "formResponse",
      "discriminator": [
        17,
        201,
        144,
        166,
        38,
        203,
        253,
        176
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "formClosed",
      "msg": "Form is closed for responses"
    },
    {
      "code": 6001,
      "name": "unauthorized",
      "msg": "unauthorized"
    }
  ],
  "types": [
    {
      "name": "formField",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "query",
            "type": "string"
          },
          {
            "name": "fieldType",
            "type": "u8"
          },
          {
            "name": "required",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "formMetaData",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "creator",
            "type": "pubkey"
          },
          {
            "name": "createdAt",
            "type": "i64"
          },
          {
            "name": "title",
            "type": "string"
          },
          {
            "name": "description",
            "type": "string"
          },
          {
            "name": "formSchema",
            "type": {
              "vec": {
                "defined": {
                  "name": "formField"
                }
              }
            }
          },
          {
            "name": "isOpen",
            "type": "bool"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "formResponse",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "form",
            "type": "pubkey"
          },
          {
            "name": "responder",
            "type": "pubkey"
          },
          {
            "name": "answers",
            "type": "bytes"
          },
          {
            "name": "respondedAt",
            "type": "i64"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    }
  ]
};
