#include <iostream>

void doB()
{
    std::cout << "B\n";
}

void doA()
{
    std::cout << "A1\n";
    doB();
    std::cout << "A2\n";
}

int main()
{
    std::cout << "M1\n";
    doA();
    doB();
    doA();
    std::cout << "M2\n";
    return 0;
}
