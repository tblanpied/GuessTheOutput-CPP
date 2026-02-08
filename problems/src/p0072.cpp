#include <iostream>

void check()
{
    std::cout << "C1\n";
    return;
    std::cout << "C2\n";
}

int main()
{
    std::cout << "M1\n";
    check();
    std::cout << "M2\n";
    return 0;
}
