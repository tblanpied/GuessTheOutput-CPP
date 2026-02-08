#include <iostream>

void second()
{
    std::cout << "2\n";
}

void first()
{
    std::cout << "1";
    second();
    std::cout << "3\n";
}

int main()
{
    std::cout << "0\n";
    first();
    std::cout << "4\n";
    return 0;
}
