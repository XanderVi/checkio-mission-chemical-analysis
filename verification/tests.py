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
            "input": 64,
            "answer": [15, 21, 28],
        },
        {
            "input": 371,
            "answer": [36, 45, 55, 66, 78, 91],
        },
        {
            "input": 225,
            "answer": [105, 120],
        },
        {
            "input": 882,
            "answer": [],
        },
    ],
    "Extra": [
        {
            "input": 631,
            "answer": [190, 210, 231]
        },
        {
            "input": 130,
            "answer": [21, 28, 36, 45]
        },
        {
            "input": 216,
            "answer": [6, 10, 15, 21, 28, 36, 45, 55]
        },
        {
            "input": 219,
            "answer": [3, 6, 10, 15, 21, 28, 36, 45, 55]
        },

        {
            "input": 994,
            "answer": []
        },
        {
            "input": 454,
            "answer": [3, 6, 10, 15, 21, 28, 36, 45, 55, 66, 78, 91]
        },
        {
            "input": 136,
            "answer": [36, 45, 55]
        },

        {
            "input": 5,
            "answer": []
        },

        {
            "input": 10,
            "answer": [1, 3, 6]
        }


    ]
}
