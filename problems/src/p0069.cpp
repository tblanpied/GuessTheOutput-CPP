#include <iostream>

void doPrint()
{
    std::cout << "In doPrint()\n";
}

int main()
{
    std::cout << "Begin\n";

    doPrint;

    std::cout << "Middle\n";
    doPrint();

    std::cout << "End\n";
    return 0;
}
