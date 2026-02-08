#include <iostream>

int main()
{
    int n{ 5 };
    int minValue{ -(1 << (n - 1)) };
    int maxValue{ (1 << (n - 1)) - 1 };

    std::cout << minValue << ' ' << maxValue << '\n';
    return 0;
}
