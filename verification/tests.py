"""
TESTS is a dict with all you tests.
Keys for this will be categories' names.
Each test is dict with
    "input" -- input data for user function
    "answer" -- your right answer
    "explanation" -- not necessary key, it's using for additional info in animation.
"""

TESTS = {
    "Basics": [
        {
            "input": ['C2H5OH', 2],
            "answer": ['C', 'H'],
        },
        {
            "input": ['H2O', 2],
            "answer": ['H'],
        },
        {
            "input": ['Mg(OH)2', 1],
            "answer": ['H', 'Mg', 'O'],
        },
        {
            "input": ['K4[ON(SO3)2]2', 4],
            "answer": ['K', 'O', 'S'],
        }
    ],
    "Extra": [
        {
            "input": ['C2H6O', 6],
            "answer": ['H'],
        },
        {
            "input": ['CaF2', 1],
            "answer": ['Ca', 'F'],
        },
        {
            "input": ['(NH4)2SO4', 4],
            "answer": ['H', 'O'],
        },
        {
            "input": ['Mg3(PO4)2', 2],
            "answer": ['Mg', 'O', 'P'],
        },

        {
            "input": ['(CH3COO)2Ca', 4],
            "answer": ['H', 'O'],
        }

    ]
}
