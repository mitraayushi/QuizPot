const questions = [
    { question: "What is the capital of France?", options: ["Berlin", "Madrid", "Paris", "Rome"], answer: 2 },
    { question: "Which language is used for web development?", options: ["Python", "JavaScript", "C#", "Java"], answer: 1 },
    { question: "What is the largest planet in our solar system?", options: ["Earth", "Mars", "Jupiter", "Saturn"], answer: 2 },
    { question: "Who wrote 'Hamlet'?", options: ["Charles Dickens", "William Shakespeare", "J.K. Rowling", "Leo Tolstoy"], answer: 1 },
    { question: "What is the square root of 64?", options: ["6", "7", "8", "9"], answer: 2 },
    { question: "What year did the Titanic sink?", options: ["1910", "1911", "1912", "1913"], answer: 2 },
    { question: "What is the chemical symbol for water?", options: ["O2", "CO2", "H2O", "NaCl"], answer: 2 },
    { question: "What is the largest continent?", options: ["Africa", "Asia", "Europe", "Antarctica"], answer: 1 },
    { question: "Who is known as the 'Father of Computers'?", options: ["Charles Babbage", "Alan Turing", "Steve Jobs", "Bill Gates"], answer: 0 },
    { question: "What is the boiling point of water?", options: ["90°C", "100°C", "110°C", "120°C"], answer: 1 }
];

let currentQuestion = 0;
let correctAnswers = 0;

document.getElementById("start-quiz").addEventListener("click", function () {
    document.getElementById("home-page").style.display = "none";
    document.getElementById("quiz-page").style.display = "block";
    loadQuestion();
});

document.getElementById("next-question").addEventListener("click", function () {
    checkAnswer();
    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
    }
    if (currentQuestion === questions.length - 1) {
        document.getElementById("next-question").style.display = "none";
        document.getElementById("submit-quiz").style.display = "inline-block";
    }
});

document.getElementById("submit-quiz").addEventListener("click", function () {
    checkAnswer();
    document.getElementById("quiz-page").style.display = "none";
    document.getElementById("analytics-page").style.display = "block";

    const score = Math.round((correctAnswers / questions.length) * 100);
    document.getElementById("progress-circle").style.setProperty('--score', score);
    document.getElementById("result-text").textContent = `${score}%`;
});

document.getElementById("get-reward").addEventListener("click", function () {
    document.getElementById("reward-popup").style.display = "flex";
});

document.querySelector(".close").addEventListener("click", function () {
    document.getElementById("reward-popup").style.display = "none";
});

document.getElementById("claim-reward").addEventListener("click", function async () {
    const walletAddress = document.getElementById("wallet-address").value;
    withdraw();
    alert(`Reward claimed! Wallet address: ${walletAddress}`);
    document.getElementById("reward-popup").style.display = "none";
});

document.getElementById("restart-quiz").addEventListener("click", function () {
    location.reload();
});

function loadQuestion() {
    const question = questions[currentQuestion];
    const container = document.getElementById("quiz-container");
    container.innerHTML = `<h2>${question.question}</h2>`;
    question.options.forEach((option, index) => {
        container.innerHTML += `
            <div>
                <input type="radio" name="option" id="option${index}" value="${index}">
                <label for="option${index}">${option}</label>
            </div>`;
    });
}

function checkAnswer() {
    const selectedOption = document.querySelector('input[name="option"]:checked');
    if (selectedOption && parseInt(selectedOption.value) === questions[currentQuestion].answer) {
        correctAnswers++;
    }
}

const withdraw = async (amount="10")=> {

    const abi = Token.abi;
    const charge =  correctAnswers * 10;
    console.log(charge,"=========deposit=========");
    const contractAddress = "0x0cDD70427F8C2C8EFe20e52bFD8ca50a697cf36c"
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const signer = await provider.getSigner();
    const address = await signer.getAddress();
    const bounceContract = new ethers.Contract(contractAddress, abi, signer)

    await (await bounceContract.mint(address, ethers.utils.parseUnits(charge.toString(), 18))).wait();
  
  }

  const Token = {
    "_format": "hh-sol-artifact-1",
    "contractName": "Quiz",
    "sourceName": "contracts/Quiz.sol",
    "abi": [
      {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "spender",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "allowance",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "needed",
            "type": "uint256"
          }
        ],
        "name": "ERC20InsufficientAllowance",
        "type": "error"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "sender",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "balance",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "needed",
            "type": "uint256"
          }
        ],
        "name": "ERC20InsufficientBalance",
        "type": "error"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "approver",
            "type": "address"
          }
        ],
        "name": "ERC20InvalidApprover",
        "type": "error"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "receiver",
            "type": "address"
          }
        ],
        "name": "ERC20InvalidReceiver",
        "type": "error"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "sender",
            "type": "address"
          }
        ],
        "name": "ERC20InvalidSender",
        "type": "error"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "spender",
            "type": "address"
          }
        ],
        "name": "ERC20InvalidSpender",
        "type": "error"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "owner",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "spender",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
          }
        ],
        "name": "Approval",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "from",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
          }
        ],
        "name": "Transfer",
        "type": "event"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "owner",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "spender",
            "type": "address"
          }
        ],
        "name": "allowance",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "spender",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
          }
        ],
        "name": "approve",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "account",
            "type": "address"
          }
        ],
        "name": "balanceOf",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "decimals",
        "outputs": [
          {
            "internalType": "uint8",
            "name": "",
            "type": "uint8"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "from",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "donate",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "mint",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "name",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "symbol",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "transfer",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "from",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
          }
        ],
        "name": "transferFrom",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      }
    ],
    "bytecode": "0x608060405234801561001057600080fd5b506040518060400160405280600a81526020016928bab4bd282a37b5b2b760b11b8152506040518060400160405280600381526020016214541560ea1b815250816003908161005f9190610113565b50600461006c8282610113565b5050506101d2565b634e487b7160e01b600052604160045260246000fd5b600181811c9082168061009e57607f821691505b6020821081036100be57634e487b7160e01b600052602260045260246000fd5b50919050565b601f82111561010e57600081815260208120601f850160051c810160208610156100eb5750805b601f850160051c820191505b8181101561010a578281556001016100f7565b5050505b505050565b81516001600160401b0381111561012c5761012c610074565b6101408161013a845461008a565b846100c4565b602080601f831160018114610175576000841561015d5750858301515b600019600386901b1c1916600185901b17855561010a565b600085815260208120601f198616915b828110156101a457888601518255948401946001909101908401610185565b50858210156101c25787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b610835806101e16000396000f3fe608060405234801561001057600080fd5b50600436106100a95760003560e01c8063386bc05a11610071578063386bc05a1461012357806340c10f191461013657806370a082311461014b57806395d89b4114610174578063a9059cbb1461017c578063dd62ed3e1461018f57600080fd5b806306fdde03146100ae578063095ea7b3146100cc57806318160ddd146100ef57806323b872dd14610101578063313ce56714610114575b600080fd5b6100b66101c8565b6040516100c3919061067f565b60405180910390f35b6100df6100da3660046106e9565b61025a565b60405190151581526020016100c3565b6002545b6040519081526020016100c3565b6100df61010f366004610713565b610274565b604051601281526020016100c3565b6100df610131366004610713565b610298565b6101496101443660046106e9565b610328565b005b6100f361015936600461074f565b6001600160a01b031660009081526020819052604090205490565b6100b6610336565b6100df61018a3660046106e9565b610345565b6100f361019d366004610771565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b6060600380546101d7906107a4565b80601f0160208091040260200160405190810160405280929190818152602001828054610203906107a4565b80156102505780601f1061022557610100808354040283529160200191610250565b820191906000526020600020905b81548152906001019060200180831161023357829003601f168201915b5050505050905090565b60003361026881858561035b565b60019150505b92915050565b60003361028285828561036d565b61028d8585856103eb565b506001949350505050565b6001600160a01b0383166000908152602081905260408120548211156103135760405162461bcd60e51b815260206004820152602560248201527f496e73756666696369656e7420616d6f756e7420696e20646f6e6f7227732077604482015264185b1b195d60da1b60648201526084015b60405180910390fd5b61031e8484846103eb565b5060019392505050565b610332828261044a565b5050565b6060600480546101d7906107a4565b60006103523384846103eb565b50600192915050565b6103688383836001610480565b505050565b6001600160a01b0383811660009081526001602090815260408083209386168352929052205460001981146103e557818110156103d657604051637dc7a0d960e11b81526001600160a01b0384166004820152602481018290526044810183905260640161030a565b6103e584848484036000610480565b50505050565b6001600160a01b03831661041557604051634b637e8f60e11b81526000600482015260240161030a565b6001600160a01b03821661043f5760405163ec442f0560e01b81526000600482015260240161030a565b610368838383610555565b6001600160a01b0382166104745760405163ec442f0560e01b81526000600482015260240161030a565b61033260008383610555565b6001600160a01b0384166104aa5760405163e602df0560e01b81526000600482015260240161030a565b6001600160a01b0383166104d457604051634a1406b160e11b81526000600482015260240161030a565b6001600160a01b03808516600090815260016020908152604080832093871683529290522082905580156103e557826001600160a01b0316846001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9258460405161054791815260200190565b60405180910390a350505050565b6001600160a01b03831661058057806002600082825461057591906107de565b909155506105f29050565b6001600160a01b038316600090815260208190526040902054818110156105d35760405163391434e360e21b81526001600160a01b0385166004820152602481018290526044810183905260640161030a565b6001600160a01b03841660009081526020819052604090209082900390555b6001600160a01b03821661060e5760028054829003905561062d565b6001600160a01b03821660009081526020819052604090208054820190555b816001600160a01b0316836001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8360405161067291815260200190565b60405180910390a3505050565b600060208083528351808285015260005b818110156106ac57858101830151858201604001528201610690565b506000604082860101526040601f19601f8301168501019250505092915050565b80356001600160a01b03811681146106e457600080fd5b919050565b600080604083850312156106fc57600080fd5b610705836106cd565b946020939093013593505050565b60008060006060848603121561072857600080fd5b610731846106cd565b925061073f602085016106cd565b9150604084013590509250925092565b60006020828403121561076157600080fd5b61076a826106cd565b9392505050565b6000806040838503121561078457600080fd5b61078d836106cd565b915061079b602084016106cd565b90509250929050565b600181811c908216806107b857607f821691505b6020821081036107d857634e487b7160e01b600052602260045260246000fd5b50919050565b8082018082111561026e57634e487b7160e01b600052601160045260246000fdfea264697066735822122034caddc5adeb79e4dec652c1d62d91815fcae5d829e84ebc4579f3f241058eee64736f6c63430008140033",
    "deployedBytecode": "0x608060405234801561001057600080fd5b50600436106100a95760003560e01c8063386bc05a11610071578063386bc05a1461012357806340c10f191461013657806370a082311461014b57806395d89b4114610174578063a9059cbb1461017c578063dd62ed3e1461018f57600080fd5b806306fdde03146100ae578063095ea7b3146100cc57806318160ddd146100ef57806323b872dd14610101578063313ce56714610114575b600080fd5b6100b66101c8565b6040516100c3919061067f565b60405180910390f35b6100df6100da3660046106e9565b61025a565b60405190151581526020016100c3565b6002545b6040519081526020016100c3565b6100df61010f366004610713565b610274565b604051601281526020016100c3565b6100df610131366004610713565b610298565b6101496101443660046106e9565b610328565b005b6100f361015936600461074f565b6001600160a01b031660009081526020819052604090205490565b6100b6610336565b6100df61018a3660046106e9565b610345565b6100f361019d366004610771565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b6060600380546101d7906107a4565b80601f0160208091040260200160405190810160405280929190818152602001828054610203906107a4565b80156102505780601f1061022557610100808354040283529160200191610250565b820191906000526020600020905b81548152906001019060200180831161023357829003601f168201915b5050505050905090565b60003361026881858561035b565b60019150505b92915050565b60003361028285828561036d565b61028d8585856103eb565b506001949350505050565b6001600160a01b0383166000908152602081905260408120548211156103135760405162461bcd60e51b815260206004820152602560248201527f496e73756666696369656e7420616d6f756e7420696e20646f6e6f7227732077604482015264185b1b195d60da1b60648201526084015b60405180910390fd5b61031e8484846103eb565b5060019392505050565b610332828261044a565b5050565b6060600480546101d7906107a4565b60006103523384846103eb565b50600192915050565b6103688383836001610480565b505050565b6001600160a01b0383811660009081526001602090815260408083209386168352929052205460001981146103e557818110156103d657604051637dc7a0d960e11b81526001600160a01b0384166004820152602481018290526044810183905260640161030a565b6103e584848484036000610480565b50505050565b6001600160a01b03831661041557604051634b637e8f60e11b81526000600482015260240161030a565b6001600160a01b03821661043f5760405163ec442f0560e01b81526000600482015260240161030a565b610368838383610555565b6001600160a01b0382166104745760405163ec442f0560e01b81526000600482015260240161030a565b61033260008383610555565b6001600160a01b0384166104aa5760405163e602df0560e01b81526000600482015260240161030a565b6001600160a01b0383166104d457604051634a1406b160e11b81526000600482015260240161030a565b6001600160a01b03808516600090815260016020908152604080832093871683529290522082905580156103e557826001600160a01b0316846001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9258460405161054791815260200190565b60405180910390a350505050565b6001600160a01b03831661058057806002600082825461057591906107de565b909155506105f29050565b6001600160a01b038316600090815260208190526040902054818110156105d35760405163391434e360e21b81526001600160a01b0385166004820152602481018290526044810183905260640161030a565b6001600160a01b03841660009081526020819052604090209082900390555b6001600160a01b03821661060e5760028054829003905561062d565b6001600160a01b03821660009081526020819052604090208054820190555b816001600160a01b0316836001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8360405161067291815260200190565b60405180910390a3505050565b600060208083528351808285015260005b818110156106ac57858101830151858201604001528201610690565b506000604082860101526040601f19601f8301168501019250505092915050565b80356001600160a01b03811681146106e457600080fd5b919050565b600080604083850312156106fc57600080fd5b610705836106cd565b946020939093013593505050565b60008060006060848603121561072857600080fd5b610731846106cd565b925061073f602085016106cd565b9150604084013590509250925092565b60006020828403121561076157600080fd5b61076a826106cd565b9392505050565b6000806040838503121561078457600080fd5b61078d836106cd565b915061079b602084016106cd565b90509250929050565b600181811c908216806107b857607f821691505b6020821081036107d857634e487b7160e01b600052602260045260246000fd5b50919050565b8082018082111561026e57634e487b7160e01b600052601160045260246000fdfea264697066735822122034caddc5adeb79e4dec652c1d62d91815fcae5d829e84ebc4579f3f241058eee64736f6c63430008140033",
    "linkReferences": {},
    "deployedLinkReferences": {}
  }
  