#include <iostream>

int main()
{
    std::cout << "This prints // comment" << std::endl;
    std::cout << "This prints /* multi-line */ comment" << std::endl;
    std::cout << "But this doesn't /* because */ print" << std::endl;
    return 0;
}
