#include <iostream>

int pickFirst(int x, int)
{
    return x;
}

int main()
{
    std::cout << pickFirst(10, 99) << '\n';
    return 0;
}
