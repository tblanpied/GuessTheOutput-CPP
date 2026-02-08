#include <iostream>

int value{3};

namespace alpha
{
    int value{1};
}

namespace beta
{
    int value{2};
}

int main()
{
    std::cout << alpha::value << ' ' << beta::value << ' ' << ::value << '\n';
    return 0;
}
