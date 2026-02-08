#include <iostream>

int getNumber()
{
    return 5;
    return 7;
}

int main()
{
    std::cout << getNumber() << '\n';
    std::cout << getNumber() << '\n';
    return 0;
}
