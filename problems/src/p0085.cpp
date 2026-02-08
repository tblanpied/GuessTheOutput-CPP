#include <iostream>

void sideEffect()
{
    std::cout << "S";
}

int main()
{
    std::cout << (sideEffect(), 3) << (sideEffect(), 4) << '\n';
}
